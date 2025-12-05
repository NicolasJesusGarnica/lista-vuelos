import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService, Foto } from './services/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: true,
  // Necesita CommonModule para *ngFor y otras directivas
  imports: [CommonModule, RouterOutlet], 
  template: `
    <main class="container">
      <!-- TÍTULO ACTUALIZADO SEGÚN TU SOLICITUD -->
      <h1>ASR GALERIA DE ARTE</h1>
      
      <!-- Lógica de la galería movida desde el app.html original -->
      <div class="gallery-grid">
        <div class="photo-card" *ngFor="let foto of listaFotos">
          <div class="photo-img-container">
              <img [src]="foto.url" [alt]="foto.titulo">
          </div>
          <div class="photo-info">
              <h2 class="photo-title">{{ foto.titulo }}</h2>
              <p class="photo-author">Por {{ foto.autor }}</p>
              <span class="photo-category">{{ foto.categoria }}</span>
              <span class="photo-date">{{ foto.fecha }}</span>
          </div>
        </div>
      </div>
      
      <div *ngIf="listaFotos.length === 0" class="loading">
        <p>Cargando imágenes de la galería...</p>
      </div>
    </main>
  `,
  styleUrl: './app.css' // Reutiliza el CSS global
})
export class GaleriaComponent implements OnInit {
  // Inyección del servicio de Firestore
  private firestoreService = inject(FirestoreService);
  
  listaFotos: Foto[] = []; 
  
  // Datos de ejemplo para inicializar Firestore si está vacío
  datosIniciales: Foto[] = [
    // URLs con IDs distintos
    { titulo: 'Amanecer en el Desierto', autor: 'Ana P.', fecha: '2025-01-15', categoria: 'Paisaje', url: 'https://picsum.photos/id/237/400/300' },
    { titulo: 'Retrato Urbano', autor: 'Beto F.', fecha: '2025-02-01', categoria: 'Retrato', url: 'https://picsum.photos/id/171/400/300' },
    { titulo: 'Arquitectura Minimalista', autor: 'Carlos G.', fecha: '2025-03-20', categoria: 'Urbano', url: 'https://picsum.photos/id/108/400/300' },
    { titulo: 'Vida Silvestre', autor: 'Diana M.', fecha: '2025-04-10', categoria: 'Naturaleza', url: 'https://picsum.photos/id/150/400/300' },
    { titulo: 'Luces de Ciudad', autor: 'Ernesto L.', fecha: '2025-05-05', categoria: 'Urbano', url: 'https://picsum.photos/id/400/400/300' }, 
    { titulo: 'Ojos Profundos', autor: 'Fabiola R.', fecha: '2025-05-18', categoria: 'Retrato', url: 'https://picsum.photos/id/684/400/300' }, 
  ];


  ngOnInit() {
    this.firestoreService.getFotos().subscribe((data) => {
      
      console.log('🖼️ Fotos recibidas de Firebase:', data); 

      // Si no hay datos en Firebase, carga los datos iniciales
      if (data.length === 0) {
        console.log('Cargando datos iniciales de la galería...');
        this.cargarDatos();
      }
      
      // Actualiza la lista de fotos y las ordena por fecha (descendente)
      this.listaFotos = data;
      this.listaFotos.sort((a, b) => b.fecha.localeCompare(a.fecha));
    });
  }

  // Función para cargar los datos de ejemplo a Firestore
  cargarDatos() {
    this.datosIniciales.forEach(foto => {
      this.firestoreService.agregarFoto(foto);
    });
  }
}