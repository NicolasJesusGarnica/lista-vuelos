import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Definimos la interfaz Vuelo y la exportamos
export interface Vuelo {
  codigo: string;
  destino: string;
  aerolinea: string;
  hora: string;
  estado: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
// IMPORTANTE: La clase debe llamarse FirestoreService y tener 'export'
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  // Obtener vuelos
  getVuelos(): Observable<Vuelo[]> {
    const vuelosRef = collection(this.firestore, 'vuelos');
    return collectionData(vuelosRef, { idField: 'id' }) as Observable<Vuelo[]>;
  }

  // Agregar vuelo
  agregarVuelo(vuelo: Vuelo) {
    const vuelosRef = collection(this.firestore, 'vuelos');
    return addDoc(vuelosRef, vuelo);
  }
}