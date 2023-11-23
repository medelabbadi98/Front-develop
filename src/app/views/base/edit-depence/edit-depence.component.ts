import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-edit-depence',
  templateUrl: './edit-depence.component.html',
  styleUrls: ['./edit-depence.component.scss']
})
export class EditDepenceComponent {
  public items = <any>[];
  main_headers: any = {};
  tooltipValidated=false;
  customStylesValidated = false;
  isEn=true;
  isFr=false;
  color='danger';
  colorfill='red';
  message='';
  status='';
  position = 'top-center';
  visible = false;
  percentage = 0;
  public id: string;
  constructor(
    private Fbuilder: FormBuilder,
    private DepenseService: DepenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute)
    {
      this.activatedRoute.queryParams.subscribe(params => {
        this.id = params['id'];
        console.log(this.id); // Print the parameter to the console.
    });
    }
    DepenceForm = this.Fbuilder.group({
      typeDepence: new FormControl('', [
        Validators.required,
          ]),
      description: new FormControl('', [
        Validators.required,
         ]),
      dateDepence: [
        '',
          Validators.required
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });

  onSubmit() {
    if (true) {
      let body: URLSearchParams = new URLSearchParams();
      body.set('id',sessionStorage.getItem("id")!);
      body.set('price', this.DepenceForm.get('price')!.value!.trim());
      body.set('typeDepence', this.DepenceForm.get('typeDepence')!.value!);
      body.set('dateDepence', this.DepenceForm.get('dateDepence')!.value!);
      body.set('description', this.DepenceForm.get('description')!.value!.trim());

      console.log(body);
      this.DepenseService.updateDepense(body).subscribe(
        (response) => {
          this.color='success';
          this.colorfill='green';
          this.status='Registre_page_Toast_Status_Success';
          this. message='Registre_page_Toast_Message_Success';
          this.toggleToast();
          this.router.navigate(['Dashboard']);
        },
        (error) => {
          this.router.navigate(['Dashboard']);
          this.color='danger';
          this.status='Login_page_Toast_Status_Failed';
          this. message='Login_page_Toast_Message_Failed';
          this.toggleToast();
        }
      );
    }
  }

  ngOnInit(): void {

    this.items = [
      { label: 'Home', url: '/', attributes: { title: 'Home' } },
      { label: 'Library', url: '/' },
      { label: 'Data', url: '/dashboard/' },
      { label: 'CoreUI', url: '/' }
    ];

    setTimeout(() => {
      this.items = [
        { label: 'CoreUI', url: '/' },
        { label: 'Data', url: '/dashboard/' },
        { label: 'Library', url: '/' },
        { label: 'Home', url: '/', attributes: { title: 'Home' } }
      ];
    }, 5000);
  }
  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 20;
  }
}
