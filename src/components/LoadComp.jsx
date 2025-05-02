import Spinner from 'react-bootstrap/Spinner';

function LoadComp() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h h-100" >
      <Spinner animation="border" role="status"
          style={{ width: '8rem', height: '8rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadComp;