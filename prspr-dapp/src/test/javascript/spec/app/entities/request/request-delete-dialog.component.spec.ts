/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrsprTestModule } from '../../../test.module';
import { RequestDeleteDialogComponent } from 'app/entities/request/request-delete-dialog.component';
import { RequestService } from 'app/entities/request/request.service';

describe('Component Tests', () => {
    describe('Request Management Delete Component', () => {
        let comp: RequestDeleteDialogComponent;
        let fixture: ComponentFixture<RequestDeleteDialogComponent>;
        let service: RequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrsprTestModule],
                declarations: [RequestDeleteDialogComponent]
            })
                .overrideTemplate(RequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
