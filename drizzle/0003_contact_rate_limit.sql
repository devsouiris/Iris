CREATE TABLE IF NOT EXISTS public.contact_rate_limits (
  origin_hash varchar(64) PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  request_count integer NOT NULL CHECK (request_count BETWEEN 1 AND 2)
);

ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.contact_rate_limits FROM PUBLIC, anon, authenticated;
