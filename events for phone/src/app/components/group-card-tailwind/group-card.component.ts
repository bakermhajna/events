import { Component, Input, OnInit } from '@angular/core';
import { group } from '../../models/group';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [],
  template:`
  <div class="flex justify-center items-center  ">
    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-5">
        <img class="w-full object-cover"       
          [src]="imgurl"
          alt="Card Image">
          
        <div class="p-4">
          <h2 class="text-xl font-bold text-gray-800 mb-2">{{group.name}}</h2>
        </div>
        @if(group.ifAdmin){
            <div>
                <h3>admin</h3>
            </div>
        }
      </div>
    </div>
  `,
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent implements OnInit {

  @Input() group:group={} as group;
  imgurl!:String
  ngOnInit(): void {
    this.imgurl = this.group.filePath[0] ?? "";
  }
  
  
  

}