import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent, ArticleComponent, TypeinComponent, UploadComponent, ManageComponent, ModifyArticleComponent, PreviewArticleComponent } from '../views';
const routes: Routes = [
    { path: '', redirectTo: 'review', pathMatch: 'full' },
    {
        path: 'review',
        component: ReviewComponent,
    },
    {
        path: 'article',
        component: ArticleComponent,
    },
    {
        path: 'typein',
        component: TypeinComponent,
    },
    {
        path: 'modify/:articleId',
        component: ModifyArticleComponent,
    },
    {
        path: 'preview/:articleId',
        component: PreviewArticleComponent,
    },
    {
        path: 'upload',
        component: UploadComponent,
    },
    {
        path: 'manage',
        component: ManageComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})

export class RoutingModule { }
