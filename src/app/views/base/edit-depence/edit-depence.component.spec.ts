import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepenceComponent } from './edit-depence.component';
import { IconSetService } from '@coreui/icons-angular';
import { AccordionModule, CardModule, GridModule } from '@coreui/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DocsComponentsModule } from 'src/components';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditDepenceComponent', () => {
  let component: EditDepenceComponent;
  let fixture: ComponentFixture<EditDepenceComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDepenceComponent ],
      imports: [AccordionModule, NoopAnimationsModule, CardModule, GridModule, DocsComponentsModule, RouterTestingModule],
      providers: [IconSetService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDepenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
