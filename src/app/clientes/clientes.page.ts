import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  isLoading: boolean = false;
  cliente: any;

  getCliente(){
    this.isLoading = true
    fetch('http://localhost/api_fatec/clientes/listar.php')
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

}
