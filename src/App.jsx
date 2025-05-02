import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.scss'
import { getApi } from './Api/getApi';
import {Row,Form,Col,Container,Button,Image} from 'react-bootstrap';
import LoadComp from './components/LoadComp';

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState({ message: '', type: '' })
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
      txtInputData: ""
  });

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.id]: e.target.value
      });
  };

  const search = async () => {
    setLoading(true);
    const params = {
      id :"clgh1vxtu0011mo081dplq3xs",
      inputs: [form.txtInputData]
    }
    try {
      const data = await getApi({
          url: 'https://simple-api.glif.app',
          endpoint: '',
          params : params,
          apiToken: 'glif_d3431ce9230ade9a4201af51d73f6af9bcb83d28e5eaae85cf897b8cfed60592',
          setError
      }).then(data => {
          console.log(data)
          setError('');
          setLoading(false);
          console.log(data.data.output)
          setResponse(data.data.output);

          if(data.data.error){
            console.log("Error : ")
            setError({ message: data.data.error, type: 'danger' })
          }
          
      }).catch(error => {
          setLoading(false)
          setError({ message: error.message, type: 'danger' });
          console.error('Error al obtener los datos:', error.message);
      });
    }catch(error){
      setError({ message: error.message, type: 'danger' });
      console.error('Error al obtener los datos 2:', error.message);
    }
};



  return (
    <>
      <Container>
        <Form className="col-6 m-auto p-3">
            <Form.Group as={Row} className="mb-3">
              <Row><h1>Crea una imagen con Glif</h1></Row>
              <Row>
                <Col className='d-flex p-2 mx-3'>
                  <Form.Control 
                    type="textarea"
                    as="textarea" rows={1}
                    placeholder='Ingrese las caracteristicas de la Imagen '
                    id="txtInputData" 
                    onChange={handleChange}
                  />
                  <Button variant="primary" 
                          onClick={search}
                          className='mx-2'>
                        Buscar
                    </Button>
                </Col>
                </Row>
            </Form.Group>
        </Form>
        <Row>
          <Col>
            <h3>Aca se cargara tu imagen</h3>
            <div className='container d-flex justify-content-center'>
              <div className='container-image d-flex'>
                {console.log(response)}
                {console.log(loading)}
                {response ? (
                  loading == true ? (
                    <LoadComp/>
                  ) : (
                    <Image src={response} thumbnail />
                  )
                ) : (
                  loading == true && error.message !== ' ' ? (
                    <LoadComp/>
                  ) : (
                    error.message
                  )
                )}
                  
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default App
