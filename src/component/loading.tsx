import '../App.scss';

/** Loading component shown at a few places. */
export default function Loading({children}: {children: string}) {
  return (
    <div className="mt-3"><h2>{children}</h2></div>
  );
}