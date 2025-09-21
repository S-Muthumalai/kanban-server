-- CreateEnum
CREATE TYPE "public"."CardStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'QA', 'DONE');

-- CreateTable
CREATE TABLE "public"."CardDetail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imgUrl" TEXT,
    "status" "public"."CardStatus" NOT NULL DEFAULT 'TODO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardDetail_pkey" PRIMARY KEY ("id")
);
