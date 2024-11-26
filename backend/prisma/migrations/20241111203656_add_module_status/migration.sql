-- CreateTable
CREATE TABLE "module_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "module_status_moduleName_key" ON "module_status"("moduleName");
