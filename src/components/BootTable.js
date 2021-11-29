import React, { useEffect, useState } from "react";
import api from "../services/api";
import * as ReactBootStrap from "react-bootstrap";
import Helmet from "react-helmet";

const BootTable = () => {
  const [pedidos, setPedidos] = useState({ ordensServico: [] });
  const msg_status = [
    "Preparando pedido..",
    "Pedido saiu para entrega",
    "Pedido entregue",
    "Enviando Pedido à cozinha",
  ];

  const variantBtn = ["Warning", "Success", "Primary"];

  useEffect(() => {
    const fetchOrdensServico = async () => {
      const { data } = await api.get("/ordemservico");
      setPedidos({ ordensServico: data });
      console.log(pedidos.ordensServico.ordens);
    };
    fetchOrdensServico();
  }, [setPedidos]);

  return (
    <div>
      <Helmet>
        <meta http-equiv="refresh" content="10" />
      </Helmet>

      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>horario</th>
            <th>nome</th>
            <th>contato</th>
            <th>endereco</th>
            <th>pagamento</th>
            <th>enviar troco(R$)</th>
            <th>pedido</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.ordensServico.ordens &&
            pedidos.ordensServico.ordens.map((item) => (
              <tr key={item._id}>
                <td>{getDataFormatada(item.data)}</td>
                <td>{item.nome}</td>
                <td>{item.telefone}</td>
                <td>{item.delivery_address}</td>
                <td>{item.forma_pagamento}</td>
                <td>
                  {item.preco.toFixed(2)} | {item.troco_para} |{" "}
                  {item.troco_para !== 0
                    ? (item.troco_para - item.preco).toFixed(2)
                    : "-"}
                </td>
                <td>{getItensPedido(item._id)}</td>
                <td>
                  <ReactBootStrap.DropdownButton
                    id="dropdown-basic-button"
                    variant={getColorStatusBtn(item.status)}
                    title={item.status}
                  >
                    <ReactBootStrap.Dropdown.Item
                      onClick={() => {
                        handleStatus(item._id, msg_status[0], item.token);
                      }}
                      href="#/action-1"
                    >
                      {msg_status[0]}
                    </ReactBootStrap.Dropdown.Item>

                    <ReactBootStrap.Dropdown.Item
                      onClick={() => {
                        handleStatus(item._id, msg_status[1], item.token);
                      }}
                      href="#/action-2"
                    >
                      {msg_status[1]}
                    </ReactBootStrap.Dropdown.Item>

                    <ReactBootStrap.Dropdown.Item
                      onClick={() => {
                        handleStatus(item._id, msg_status[2], item.token);
                      }}
                      href="#/action-3"
                    >
                      {msg_status[2]}
                    </ReactBootStrap.Dropdown.Item>
                  </ReactBootStrap.DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );

  function getColorStatusBtn(status) {
    if (status === msg_status[0]) {
      return variantBtn[0].toLocaleLowerCase();
    } else if (status === msg_status[1]) {
      return variantBtn[1].toLocaleLowerCase();
    } else if (status === msg_status[2]) {
      return variantBtn[2].toLocaleLowerCase();
    } else if (status === msg_status[3]) {
      return variantBtn[0].toLocaleLowerCase();
    }
  }

  function getDataFormatada(data) {
    let date = new Date(data);
    let data_formatada =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return data_formatada;
  }

  function getItensPedido(ordem_id) {
    let strPedidos = "";

    for (let i = 0; i < pedidos.ordensServico.ordens.length; i++) {
      //se bater o ordem_id, concatena os pedidos
      if (pedidos.ordensServico.ordens[i]["_id"] === ordem_id) {
        for (
          let j = 0;
          j < pedidos.ordensServico.ordens[i].itensPedido.length;
          j++
        ) {
          strPedidos +=
            pedidos.ordensServico.ordens[i].itensPedido[j].quantidade +
            "x " +
            pedidos.ordensServico.ordens[i].itensPedido[j].nome +
            "(" +
            getStrAdicionais(
              pedidos.ordensServico.ordens[i].itensPedido[j].adicionais
            ) +
            ") ";
        }
      }
    }

    return strPedidos;
  }

  function getStrAdicionais(...adicionais) {
    let retorno = "";

    for (let obj in adicionais[0]) {
      if (adicionais[0][obj].quantidade > 0) {
        retorno +=
          "+" + adicionais[0][obj].quantidade + "x " + adicionais[0][obj].nome;
      }
    }

    return retorno;
  }

  //buscar status
  //atualizar
  //notificar

  async function handleStatus(id, value, expoToken) {
    //atualiza status do pedido no banco
    const res = await api.put("/ordemservico/" + id, { status: value });
    //atualiza a lista visualmente
    window.location.reload(false);
    //envia notificacao para o usuario
    const notify = await api.post("/notifications", {
      titulo: "atualizacao de status",
      mensagem: value,
      token: expoToken,
    });
  }
};

export default BootTable;
