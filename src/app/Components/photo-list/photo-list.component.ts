import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  albumId: number;
  photos: any;
  skip: number = 0;
  take: number = 20;

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.params["id"];
    console.log(this.albumId);

    this.data.getPhotos(this.albumId, this.skip, this.take).subscribe(res => this.photos = res);
  }

}
