import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuService } from './menu.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'

describe('MenuService', () => {
  let service: MenuService;
  let httpTestingController : HttpTestingController;
  beforeEach(() => {
    //let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    
    });
    httpTestingController = TestBed.inject(HttpTestingController );
    service = TestBed.inject(MenuService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Debe retornar objecto del 
  it('Should return obj (Login ok)', () => {
    //TODO: Mock de datos!
    const mockCredentials = {
      email: 'alguien@adb.com',
      password: '123456'
    }

    const mockResult = {
      accessToken: "sd46s5a4da1sd435"
    }

    service.loginUsers(mockCredentials)
      .subscribe(res => { //TODO:Hacer que de por finalizado la prueba:
        expect(res).toEqual(mockResult)
        
      })
      const req = httpTestingController.expectOne({ method: 'POST'})
      console.log('xxxxxx',req)
      req.flush(mockResult);
    })
  // TODO:Una respuesta incorrecta :400
  it(' should return an error 400', () => {
    //TODO: mock de datos
    const invalidCredential = {
      email: 'adaj@ahd.com',
      password: '123478'
    }
    const resultMock = new HttpErrorResponse({
      error: "err",
      status: 400,
      statusText: 'Not Found'
    })
    
    //httpClientSpy.post.and.returnValue(throwError(resultMock))
    //TODO:
    // const { email, password } = invalidCredential
    service.loginUsers(invalidCredential)
      .subscribe({
        next: res => {

        },
        error: error => {
          expect(error.status).toEqual(400);
          
        }
      })
      const req = httpTestingController.expectOne({ method: 'POST'})
      console.log('yyyyyyyy',req)
      req.flush(resultMock);
  })

});
