import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirestoreService, Vuelo } from './services/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private firestoreService = inject(FirestoreService);
  listaVuelos: Vuelo[] = [];

  esModoOscuro: boolean = false; 
  datosIniciales: Vuelo[] = [
    { codigo: 'OB-760', destino: 'MIAMI', aerolinea: 'BoA', hora: '08:00', estado: 'A TIEMPO' },
    { codigo: 'AA-900', destino: 'MADRID', aerolinea: 'Air Europa', hora: '09:15', estado: 'EMBARCANDO' },
    { codigo: 'LA-500', destino: 'SANTIAGO', aerolinea: 'Latam', hora: '10:30', estado: 'DEMORADO' },
    { codigo: 'AV-120', destino: 'BOGOTA', aerolinea: 'Avianca', hora: '12:45', estado: 'A TIEMPO' },
    { codigo: 'AM-660', destino: 'MEXICO DF', aerolinea: 'Aeromexico', hora: '14:20', estado: 'CANCELADO' },
    { codigo: 'OB-440', destino: 'SAO PAULO', aerolinea: 'BoA', hora: '16:00', estado: 'A TIEMPO' }
  ];

  ngOnInit() {
    this.firestoreService.getVuelos().subscribe((data) => {
      

      console.log(' Datos recibidos de Firebase:', data); 

      if (data.length === 0) {
        console.log('Cargando datos iniciales...');
        this.cargarDatos();
      }
      
      this.listaVuelos = data;
      this.listaVuelos.sort((a, b) => a.hora.localeCompare(b.hora));
    });
  }

  cargarDatos() {
    this.datosIniciales.forEach(v => {
      this.firestoreService.agregarVuelo(v);
    });
  }

  cambiarModo() {
    this.esModoOscuro = !this.esModoOscuro;
  }
}