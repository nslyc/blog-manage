import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent, ArticleComponent, TypeinComponent, UploadComponent } from '../views';
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
        path: 'upload',
        component: UploadComponent,
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
