CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    role_applied_for VARCHAR(255) NOT NULL,
    experience_text TEXT NOT NULL,

    was_ghosted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX one_review_per_user_per_company ON reviews (user_id, company_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();