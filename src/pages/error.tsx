import '../App.scss';
import Loading from '../component/loading';

/** Error page, uses the Loading component temporarly */
function Error() {
  return <Loading>This is the 404 page</Loading>
}

export default Error;
