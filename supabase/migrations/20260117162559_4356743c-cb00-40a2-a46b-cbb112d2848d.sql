-- Fix function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop overly permissive policies and replace with proper ones
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert order items" ON public.order_items;

-- More restrictive insert policy for orders (require valid session or auth)
CREATE POLICY "Users can insert their own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND email IS NOT NULL)
  );

-- More restrictive insert policy for order_items (only for orders belonging to user)
CREATE POLICY "Users can insert order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND (
        (auth.uid() IS NOT NULL AND o.user_id = auth.uid()) OR
        (o.session_id IS NOT NULL)
      )
    )
  );