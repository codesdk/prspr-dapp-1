/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RequestComponentsPage, RequestDeleteDialog, RequestUpdatePage } from './request.page-object';

const expect = chai.expect;

describe('Request e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let requestUpdatePage: RequestUpdatePage;
    let requestComponentsPage: RequestComponentsPage;
    let requestDeleteDialog: RequestDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Requests', async () => {
        await navBarPage.goToEntity('request');
        requestComponentsPage = new RequestComponentsPage();
        expect(await requestComponentsPage.getTitle()).to.eq('Requests');
    });

    it('should load create Request page', async () => {
        await requestComponentsPage.clickOnCreateButton();
        requestUpdatePage = new RequestUpdatePage();
        expect(await requestUpdatePage.getPageTitle()).to.eq('Create or edit a Request');
        await requestUpdatePage.cancel();
    });

    it('should create and save Requests', async () => {
        const nbButtonsBeforeCreate = await requestComponentsPage.countDeleteButtons();

        await requestComponentsPage.clickOnCreateButton();
        await promise.all([requestUpdatePage.setTitleInput('title'), requestUpdatePage.setDescriptionInput('description')]);
        expect(await requestUpdatePage.getTitleInput()).to.eq('title');
        expect(await requestUpdatePage.getDescriptionInput()).to.eq('description');
        await requestUpdatePage.save();
        expect(await requestUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await requestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Request', async () => {
        const nbButtonsBeforeDelete = await requestComponentsPage.countDeleteButtons();
        await requestComponentsPage.clickOnLastDeleteButton();

        requestDeleteDialog = new RequestDeleteDialog();
        expect(await requestDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Request?');
        await requestDeleteDialog.clickOnConfirmButton();

        expect(await requestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
