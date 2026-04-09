ALTER TABLE "User"
ADD COLUMN "username" TEXT;

UPDATE "User"
SET "username" = CONCAT(
    COALESCE(
      NULLIF(
        regexp_replace(lower(split_part("email", '@', 1)), '[^a-z0-9_]+', '_', 'g'),
        ''
      ),
      'user'
    ),
    '_',
    "id"
  )
WHERE "username" IS NULL;

ALTER TABLE "User"
ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
