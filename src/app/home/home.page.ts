import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLoading: boolean = false;
  funcionarios: any;
  IsModalOpen: boolean = false;
  radio: any = 'all';

  constructor() {
    this.getFuncionarios();
  }

  input: any = {
    'Nome':'',
    'Sobrenome':'',
    'Cargo':'',
    'Datanasc':'',
    'Endereco':'',
    'Cidade':'',
    'CEP':'',
    'Pais':'',
    'Fone':'',
    'Salario':'',
    'CodFun':''
  };

  searched: any  = {
    'pes':''
  }

  atualizar(id: any){
    fetch('http://localhost/api/funcionario/listar_funcionario_id.php', {
      method:'post',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        'pes':id
      })
    }).then(response => response.json())
    .then(response => {
      this.input = response['funcionarios'][0]
      console.log(this.input)
      this.setOpen(true);
    }).catch(erro => {
      console.log(erro);
    })
  }
  setOpen(OPEN: any){
    this.IsModalOpen = OPEN;
    if(OPEN = false){
      this.clean()
    }
  }
  clean(){
    this.input = {
      'Nome':'',
      'Sobrenome':'',
      'Cargo':'',
      'Datanasc':'',
      'Endereco':'',
      'Cidade':'',
      'CEP':'',
      'Pais':'',
      'Fone':'',
      'Salario':'',
      'CodFun':''
    };
  }

  search(){
    fetch('http://localhost/api/funcionario/listar_funcionario_'+this.radio+'.php', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(this.searched)
    }).then(response => response.json())
    .then(response =>{
      console.log(response);
      this.funcionarios = response.funcionarios
    }).catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
    })
  }

  sendAtualiza(){
    fetch('http://localhost/api/funcionario/atualizar_funcionario.php',{
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(this.input)
    }).then(response => response.json())
    .then(response =>{
      console.log(response);
    }).catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.setOpen(false)
      if(this.searched.pes == ''){
        this.getFuncionarios()
      } else {
        this.search()
      }
      this.clean()
    })
  }

  envia(){
    fetch('http://localhost/api/funcionario/inserir_funcionario.php', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(this.input)
    }).then(response => response.json())
    .then(response =>{
      console.log(response);
    }).catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.clean()
      if(this.searched.pes == ''){
        this.getFuncionarios()
      } else {
        this.search()
      }
    })
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios;
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(id: any){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      
    })
  }


}
