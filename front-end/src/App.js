import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from "styled-components";

import api from './config/configApi';

let socket;
//style------------------------------------------------*
export const Container = styled.section`
    background: #B0C4DE;
    width: 450px;
    max-width: 450px;
    border-radius: 16px;
    box-shadow: 0 0 128px 0 rgba(0,0,0, 0.3),
                0 32px 64px -48px rgba(0,0,0, 0.6)
`;

export const Conteudo = styled.section`
    padding: 25px 30px;
`;

export const Header = styled.header`
   font-size: 25px;
   font-weight: 500;
   padding-bottom: 10px;
   border-bottom: 1px solid #4682B4;
   color:#4682B4;
`;
export const Form = styled.form`
    margin: 20px 0;
`;

export const Campo = styled.div`
    display: flex;
    margin-bottom:10px;
    flex-direction: column;
    position: relative;
`;

export const Label = styled.label`
    margin-bottom: 4px;
    margin-top: 10px;
`;

export const Input = styled.input`
    height: 40px;
    width: 390px;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

export const Select = styled.select`
    height: 40px;
    width: 390px;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

export const BtnAcessar = styled.button`
    font-size: 16px;
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    margin-top:10px;
    background-color: #E0FFFF  ;
`;

export const ConteudoChat = styled.section`
    padding: 25px 0px;
`;

export const HeaderChat = styled.header`
    width: 450px;
    display: flex;
    margin: 0px 0px 15px 5px;
    align-itens: center;
    padding: 20px 30px;
    color: #4682B4;
`;

export const NomeSetor = styled.div`
    font-size: 26px;
    font-weight: 500;
    
`;
export const ChatBox = styled.div`
    font-size: 16px;
    font-weight: 500;
    position: relative;
    min-height: 400px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px 10px 20px 10px;
    background: #F0F8FF;
    box-shadow: inset 0 32px 32px -32px rgba(0 0 0 / 5%);
                inset 0 -32px 32px -32px rgba(0 0 0 / 5%);
    
`;


export const MsgEnviada = styled.div`
    margin: 15px 16px 15px 0px;
    display: flex;
`;

export const DetMsgEnviada = styled.div`
    margin-left: auto;
    max-width: calc(100% - 130px);    
`;

export const TextoMsgEnviada = styled.p`
    background:#4682B4;
    color:#fff;
    border-radius: 18px 18px 0px 18px;
    word-wrap: break-word;
    padding: 8px 16px;   
    box-shadow: 0 0 32px rgba(0 0 0 / 8%);
               0rem 16px 16px -16px rgba(0 0 0 / 10%); 
`;

export const MsgRecebida = styled.p`
    margin: 15px 0px;
    display: flex;
    align-itens: flex-end;
`;

export const DetMsgRecebida = styled.div`
    margin-left: 10px;
    margin-right: auto;
    max-width: calc(100% - 130px);    
`;

export const TextoMsgRecebida = styled.p`
    background:#3CB371 ;
    color:#fff;
    border-radius: 18px 18px 18px 0px;
    word-wrap: break-word;
    padding: 8px 16px;   
    box-shadow: 0 0 32px rgba(0 0 0 / 8%);
               0rem 16px 16px -16px rgba(0 0 0 / 10%); 
`;

export const EnviarMsg = styled.form`
    padding: 18px 15px;
    display: flex;
    justify-content: space-between;
`;

export const CampoMsg = styled.input`
    height: 45px;
    width: 100%;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 6px 0 0 5px;
    border: 1px solid #ccc;
    outline: none;
`;

export const BtnEnviarMsg = styled.button`
    font-size: 16px;
    border-radius: 0 5px 5px 0;
    border: none;
    cursor: pointer;
    outline: none;
    width: 75px;
    background-color: #3CB371 ;
    color: #fff;
`;
export const AlertErro = styled.p`
    background-color: #f8d7da;
    color: #842029;
    margin: 10px 0;
    border: 1px solid #f5c2c7;
    border-radius: 5px;
    padding: 7px;
`;

function App() {
 
  const ENDPOINT = "http://localhost:8080/";

  const [logado, setLogado] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [salas, setSalas] = useState([]);

  const [mensagem, setMensagem] = useState("");
  const [listaMensagem, setListaMensagem] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });

//style------------------------------------------*

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    listarSalas();
  }, []);

  useEffect(() => {
    socket.on("receber_mensagem", (dados) => {
      setListaMensagem([...listaMensagem, dados]);
    });
  });

  const listarSalas = async () => {
    await api.get('/listar-sala')
    .then((response) => {
      setSalas(response.data.salas);
      console.log(response);
    }).catch((err) => {
      if(err.response){
        setStatus({
          type: 'erro',
          mensagem: err.response.data.mensagem
        });
      }else{
        setStatus({
          type: 'erro',
          mensagem: "Erro: Tente mais tarde"
        });
      }
    });
  }

  const conectarSala = async e => {
    e.preventDefault();

    console.log("Acessou a sala " + sala + " com o email " + email);

    const headers = {
      'Content-Type': 'application/json'
    }

    await api.post('/validar-acesso', {email}, {headers})
    .then((response) => {
      console.log(response.data.mensagem);
      console.log(response.data.usuario.id);
      console.log(response.data.usuario.nome);

      setNome(response.data.usuario.nome);
      setUsuarioId(response.data.usuario.id);
      setLogado(true);
      socket.emit("sala_conectar", sala);
      listarMensagens();
    }).catch((err) => {
      if(err.response){
        setStatus({
          type: 'erro',
          mensagem: err.response.data.mensagem
        });
      }else{
        setStatus({
          type: 'erro',
          mensagem: "Erro: Tente mais tarde!"
        });
      }
    });
  }

  const listarMensagens = async () => {
    await api.get("/listar-mensagens/" + sala)
    .then((response) => {
      console.log(response);
      console.log(response.data.mensagens);
      //setListaMensagem([...listaMensagem, response.data.mensagens]);
      setListaMensagem(response.data.mensagens);
    }).catch((err)=>{
      if(err.response){
        console.log(err.response.data.mensagem);
      }else{
        console.log("Erro: Tente mais tarde!");
      }
    });
  }

  const enviarMensagem = async e => {
    e.preventDefault();

    console.log("Mensagem: " + mensagem);
    const conteudoMensagem = {
      sala,
      conteudo: {
        mensagem,
        usuario: {
          id: usuarioId,
          nome
        }
      }
    }
    console.log(conteudoMensagem);

    await socket.emit("enviar_mensagem", conteudoMensagem);
    setListaMensagem([...listaMensagem, conteudoMensagem.conteudo]);
    setMensagem("");
  }

  return (
    <Container>
      {!logado ?
        <Conteudo>
          <Header>Chat da Empresa</Header>
          <Form onSubmit={conectarSala}>
            {status.type === 'erro' ? <AlertErro>{status.mensagem}</AlertErro> : ""}
            <Campo>
              <Label>E-mail: </Label>
              <Input type="text" placeholder="E-mail" name="email" value={email} onChange={(texto) => { setEmail(texto.target.value) }} />
            </Campo>

            <Campo>
              <Label>Setor: </Label>
              <Select name="sala" value={sala} onChange={texto => setSala(texto.target.value)}>
                <option value="">Selecione</option>
                {salas.map((sala) => {
                  return (
                    <option value={sala.id} key={sala.id}>{sala.nome}</option>
                  )
                })}
              </Select>
            </Campo>

            <BtnAcessar>Acessar</BtnAcessar>
          </Form>
        </Conteudo>
        :
        <ConteudoChat>
          <HeaderChat>
            <NomeSetor>Bate papo do Setor</NomeSetor>
          </HeaderChat>
          <ChatBox>
            <ScrollToBottom className="scrollMsg">
            {listaMensagem.map((msg, key) => {
              return (
                <div key={key}>
                  {usuarioId === msg.usuario.id ?
                    <MsgEnviada>
                      <DetMsgEnviada>
                        <TextoMsgEnviada>{msg.usuario.nome}: {msg.mensagem}</TextoMsgEnviada>
                      </DetMsgEnviada>
                    </MsgEnviada>
                    :
                    <MsgRecebida>
                      <DetMsgRecebida>
                        <TextoMsgRecebida>{msg.usuario.nome}: {msg.mensagem}</TextoMsgRecebida>
                      </DetMsgRecebida>
                    </MsgRecebida>
                  }
                </div>
              )
            })}
            </ScrollToBottom>
          </ChatBox>
          <EnviarMsg onSubmit={enviarMensagem}>            
            <CampoMsg type="text" name="mensagem" placeholder="Mensagem..." value={mensagem} onChange={(texto) => { setMensagem(texto.target.value) }} />

            <BtnEnviarMsg>Enviar</BtnEnviarMsg>
          </EnviarMsg>
        </ConteudoChat>
      }
    </Container>
  );
}

export default App;
