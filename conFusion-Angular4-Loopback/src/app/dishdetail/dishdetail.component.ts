import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoopBackConfig } from '../shared/sdk/';
import { API_VERSION } from '../shared/baseUrl';
import { Dishes } from '../shared/sdk/models';
import { DishesApi } from '../shared/sdk/services';
import { Comment } from '../shared/sdk/models';
import { CommentApi } from '../shared/sdk/services';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Favorite } from '../shared/sdk/models';
import { FavoriteApi } from '../shared/sdk/services';
import { Customer } from '../shared/sdk/models';
import { CustomerApi } from '../shared/sdk/services';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dishes;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite: boolean = false;
  
  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private dishservice: DishesApi,
    private commentService: CommentApi,
    private authService: CustomerApi,
    private favoriteService: FavoriteApi,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      LoopBackConfig.setBaseURL(BaseURL);
      LoopBackConfig.setApiVersion(API_VERSION);
    }

  ngOnInit() {

    this.createForm();

    // this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.findById(params['id']); })
      .subscribe((dish: Dishes) => { 
        this.dish = dish; 
        this.visibility = 'shown';
        this.dishservice.getComments(this.dish.id, {"include": ["customer"]})
          .subscribe((comments: Comment[]) =>  { console.log(comments); this.dish.comments = comments; });

        if (this.authService.getCachedCurrent())
          this.authService.getFavorites(this.authService.getCachedCurrent().id, {"where": {"dishesId": this.dish.id}})
            .subscribe(res => { console.log("Found Favorite ", res.length); (res.length == 0) ? this.favorite = false: this.favorite = true; });
       },
        errmess => this.errMess = <any>errmess);
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    if (this.authService.getCachedCurrent())    
      this.commentService.create({
        rating: this.comment.rating, 
        comment: this.comment.comment, 
        dishesId: this.dish.id, 
        customerId: this.authService.getCachedCurrent().id
      })
      .subscribe(res => { console.log(res);
        this.dishservice.getComments(this.dish.id, {"include": ["customer"]})
        .subscribe((comments: Comment[]) =>  { console.log(comments); this.dish.comments = comments; });
      });

    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addToFavorites() {
    console.log("Add to Favorites")
    if (!this.favorite && this.authService.getCachedCurrent())
      this.favoriteService.create({customerId: this.authService.getCachedCurrent().id, dishesId: this.dish.id })
        .subscribe(favorites => { console.log(favorites); this.favorite = true; });
  }
}