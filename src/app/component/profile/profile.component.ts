import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  loggedInUser:any;
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }


}
