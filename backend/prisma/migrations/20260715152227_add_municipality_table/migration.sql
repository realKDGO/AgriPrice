-- AlterTable
ALTER TABLE "User" ADD COLUMN     "municipalityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_name_key" ON "Municipality"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
