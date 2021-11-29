import React, {useState} from "react";
import api from '../services/api'


function CreateLanche() {

    const [input, setInput] = useState({

        nome: '',
        preco: '', 
        descricao: '',
        foto: ''

    })

    function handleChange(event) {
        const {name, value} = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value,

            }
        })
    }

    function handleClick(event) {
        //event.prevetDefault();

        

        const newLanche = {

            nome: input.nome,
            preco: input.preco,
            descricao: input.descricao,
            foto: input.foto
        }

        console.log(newLanche)
        api.post('/lanches', newLanche)
        
    }



    return <div class="container">
                <h1>Cadastrar Lanche</h1>

                <form>
                    <div className="form-group">
                        <input onChange={handleChange} name="nome" value ={input.nome} className="form-control" placeholder="nome do lanche"></input>

                    </div>

                    <div className="form-group">
                        <input onChange={handleChange} name="preco" value ={input.preco} className="form-control" placeholder="preco"></input>

                    </div>

                    <div className="form-group">
                    <textarea onChange={handleChange} name="descricao" value ={input.descricao} className="form-control" placeholder="descricao"></textarea>

                    </div>

                    <div className="form-group">

                        <input name="foto" onChange={handleChange} type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" for="customFile"></label>

                    </div>
                    <button onClick={handleClick} className="btn btn-lg btn-info">cadastrar!</button>
                </form>
          </div>
}

export default CreateLanche;