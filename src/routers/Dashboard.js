import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomeScreen } from "../components/Home/HomeScreen";
import { ProductScreen } from "../components/products/ProductScreen";
import { CategoryScreen } from "../components/categories/CategoryScreen";
import { UserScreen } from "../components/users/UserScreen";
import { SpecialtiesScreen } from "../components/specialties/SpecialtiesScreen";
import { RolScreen } from "../components/roles/RolScreen";
import { SymptomScreen } from "../components/symptoms/SymptomScreen";
import { UnderlyingDiseaseScreen } from "../components/underlying-disease/UnderlyingDiseaseScreen";
import { ReferenceValueScreen } from "../components/reference-value/ReferenceValueScreen";
import { SubLaboratoryScreen } from "../components/sub-laboratory/SubLaboratoryScreen";

export const DashboardRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route path="/products" component={ProductScreen} />
        <Route path="/users" component={UserScreen} />
        <Route path="/categories" component={CategoryScreen} />
        <Route path="/specialties" component={SpecialtiesScreen} />
        <Route path="/roles" component={RolScreen} />
        <Route path="/symptoms" component={SymptomScreen} />
        <Route path="/underlying-disease" component={UnderlyingDiseaseScreen} />
        <Route path="/reference-value" component={ReferenceValueScreen} />
        <Route path="/sub-laboratory" component={SubLaboratoryScreen} />
      </Switch>
    </div>
  );
};
