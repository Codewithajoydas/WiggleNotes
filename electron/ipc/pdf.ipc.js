import { ipcMain, BrowserWindow, dialog } from "electron";
import fs from "fs";

export function registerPdfHandlers() {
    ipcMain.handle("export-pdf", async (_, html, fileName) => {
        const pdfWindow = new BrowserWindow({ show: false });

        await pdfWindow.loadURL(
            `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
        );

        const pdf = await pdfWindow.webContents.printToPDF({
            printBackground: true,
        });

        const { canceled, filePath } = await dialog.showSaveDialog({
            title: "Save PDF",
            defaultPath: `${fileName}.pdf`,
            filters: [{ name: "PDF Files", extensions: ["pdf"] }],
        });

        if (canceled || !filePath) {
            pdfWindow.close();
            return null;
        }

        fs.writeFileSync(filePath, pdf);
        pdfWindow.close();
        return filePath;
    });
}