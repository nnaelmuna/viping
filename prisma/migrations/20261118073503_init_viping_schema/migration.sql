-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endpoints" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "check_interval_sec" INTEGER NOT NULL DEFAULT 60,
    "timeout_ms" INTEGER NOT NULL DEFAULT 5000,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "endpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_logs" (
    "id" TEXT NOT NULL,
    "endpoint_id" TEXT NOT NULL,
    "status_code" INTEGER,
    "response_time_ms" INTEGER,
    "is_success" BOOLEAN NOT NULL,
    "error_message" TEXT,
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "check_logs_endpoint_id_checked_at_idx" ON "check_logs"("endpoint_id", "checked_at" DESC);

-- AddForeignKey
ALTER TABLE "endpoints" ADD CONSTRAINT "endpoints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_logs" ADD CONSTRAINT "check_logs_endpoint_id_fkey" FOREIGN KEY ("endpoint_id") REFERENCES "endpoints"("id") ON DELETE CASCADE ON UPDATE CASCADE;
