-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);
