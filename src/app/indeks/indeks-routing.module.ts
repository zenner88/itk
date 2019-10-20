import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { IndeksComponent } from "./indeks.component";
import { FormComponent } from "./form/form.component";
import { FormObjektifComponent } from "./formobjektif/formobjektif.component";
import { TreeGridComponent } from "./tree-grid/tree-grid.component";
import { NotFoundComponent } from "../pages/miscellaneous/not-found/not-found.component";
import { StepperComponent } from "./stepper/stepper.component";
import { ValidasiFormObjektifComponent } from "./validasiFormObjektif/formobjektif.component";
import { AuthGuard, LoginGuard } from "../guard";

const routes: Routes = [
  {
    path: "",
    component: IndeksComponent,
    children: [
      {
        path: "form",
        canActivate: [AuthGuard],
        component: FormComponent
      },
      {
        path: "objektif",
        canActivate: [AuthGuard],
        component: TreeGridComponent
      },
      {
        path: "formObjektif",
        canActivate: [AuthGuard],
        component: FormObjektifComponent
      },
      {
        path: "validasiFormObjektif",
        canActivate: [AuthGuard],
        component: ValidasiFormObjektifComponent
      },
      {
        path: "formPIP",
        canActivate: [AuthGuard],
        component: StepperComponent
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndeksRoutingModule {}
export const routedComponents = [TreeGridComponent, FormObjektifComponent];
