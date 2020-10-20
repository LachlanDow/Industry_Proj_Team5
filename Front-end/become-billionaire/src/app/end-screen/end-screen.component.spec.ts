import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { EndScreenComponent } from './end-screen.component';

describe('EndScreenComponent', () => {
  let component: EndScreenComponent;
  let fixture: ComponentFixture<EndScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndScreenComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Pressing backbuttons button turns display  True', () => {
    const fixture = TestBed.createComponent(EndScreenComponent);
    const app = fixture.componentInstance;
    app.onPress();
    expect(app.display).toBeTruthy();
  });
});
