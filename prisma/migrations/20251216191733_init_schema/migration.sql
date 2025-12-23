-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonContent" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "LessonContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonSubmission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "lessonID" INTEGER NOT NULL,

    CONSTRAINT "LessonSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonContent" ADD CONSTRAINT "LessonContent_id_fkey" FOREIGN KEY ("id") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
