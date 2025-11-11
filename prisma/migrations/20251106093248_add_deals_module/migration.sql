-- CreateEnum
CREATE TYPE "DealStage" AS ENUM ('NEW', 'NEGOTIATING', 'DUE_DILIGENCE', 'CLOSED');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('ACTIVE', 'LOST', 'WON');

-- CreateTable
CREATE TABLE "Deal" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION,
    "stage" "DealStage" NOT NULL DEFAULT 'NEW',
    "status" "DealStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealStartup" (
    "id" SERIAL NOT NULL,
    "dealId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "DealStartup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealInvestor" (
    "id" SERIAL NOT NULL,
    "dealId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "DealInvestor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DealStartup" ADD CONSTRAINT "DealStartup_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealStartup" ADD CONSTRAINT "DealStartup_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealInvestor" ADD CONSTRAINT "DealInvestor_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealInvestor" ADD CONSTRAINT "DealInvestor_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
