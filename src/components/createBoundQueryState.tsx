import { QueryState, type QueryStateProps } from './QueryState';

export type QueryStateBindings = Pick<
  QueryStateProps,
  'formatError' | 'errorDescription' | 'retryLabel' | 'loadingLabel'
>;

export type BoundQueryStateProps = Omit<QueryStateProps, keyof QueryStateBindings>;

/** Factory for SPA-local i18n/error bindings around shared QueryState. */
export function createBoundQueryState(useBindings: () => QueryStateBindings) {
  function BoundQueryState(props: BoundQueryStateProps) {
    const bindings = useBindings();
    return <QueryState {...bindings} {...props} />;
  }

  BoundQueryState.displayName = 'BoundQueryState';
  return BoundQueryState;
}
