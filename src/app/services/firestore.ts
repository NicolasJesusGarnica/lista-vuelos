import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// 1. Definimos la nueva interfaz Foto y la exportamos
export interface Foto {
  titulo: string;
  autor: string;
  fecha: string;
  categoria: string;
  url: string; // URL de la imagen (usaremos picsum.photos como ejemplo)
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  // 2. Método para obtener fotos (colección 'galeria')
  getFotos(): Observable<Foto[]> {
    const fotosRef = collection(this.firestore, 'galeria'); 
    // Indicamos que los datos serán un Observable de arrays de Fotos
    return collectionData(fotosRef, { idField: 'id' }) as Observable<Foto[]>;
  }

  // 3. Método para agregar foto
  agregarFoto(foto: Foto) {
    const fotosRef = collection(this.firestore, 'galeria');
    return addDoc(fotosRef, foto);
  }
}