-- The RLS event-trigger helper has SECURITY DEFINER privileges and must not
-- be callable through Supabase's public API roles.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- Cover both foreign keys on organization_members.
CREATE INDEX IF NOT EXISTS organization_members_user_id_idx
  ON public.organization_members (user_id);
CREATE INDEX IF NOT EXISTS organization_members_organization_id_idx
  ON public.organization_members (organization_id);
