import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})

export class TablasComponent {
  constructor(private router: Router){}

  // APIurl = 'https://localhost:5001/api/Persona/personas'

  ngOnInit(): void{
    
  }
}
