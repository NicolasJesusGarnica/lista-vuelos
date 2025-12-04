import { TestBed } from '@angular/core/testing';
// 1. Importamos el nombre correcto: FirestoreService
import { FirestoreService } from './firestore';
// 2. Importamos Firestore de la librería para poder "burlarlo" (mock) en el test
import { Firestore } from '@angular/fire/firestore';

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    // Creamos un objeto falso para simular la base de datos en el test
    const firestoreMock = {}; 

    TestBed.configureTestingModule({
      providers: [
        FirestoreService, // Proveemos nuestro servicio
        { provide: Firestore, useValue: firestoreMock } // Proveemos el mock de Firebase
      ]
    });
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});