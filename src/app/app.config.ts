import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
        projectId: "apis-35db4",
        appId: "1:210077344166:web:2de788609ce95111cd6f67",
        storageBucket: "apis-35db4.firebasestorage.app",
        apiKey: "AIzaSyCSKCJHtS2wHsPNbbjrND9uwUdZZNtfQps",
        authDomain: "apis-35db4.firebaseapp.com",
        messagingSenderId: "210077344166",
        measurementId: "G-EWQ1R1YLDQ"
    })),
    provideFirestore(() => getFirestore())
  ]
};