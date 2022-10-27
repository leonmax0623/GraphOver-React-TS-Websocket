import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { paths } from '../shared/paths';

import { PrivateRoute, UnAuthRoute } from 'shared/config';
import { Auction } from './auction';
import { Auctions } from './auctions';
import { LoginPage } from './authorization/login';
import { RecoverPassword } from './authorization/recover-password';
import { RegisterPage } from './authorization/register';
import { Chat } from './chat';
import { Check } from './check';
import { HomePage } from './home';
import { Modals } from './modals';
import { Notebook } from './notebook';
import { Order } from './order';
import { PlotsCatalogPage } from './plots/catalog';
import { PlotsCatalogPage2 } from './plots/catalog-author';
import { CatalogInner } from './plots/catalog-inner';
import { CatalogInner2 } from './plots/catalog-inner2';
import { OrderCatalogPage } from './plots/catalog-orders';
import { Tariffs } from './tariffs';
import { WinPerformer } from './window-performer';
// import { AuthorProfile } from './author-profile';
import { useSelector } from 'react-redux';
import { ProfileAdmin } from './admin/profile-admin';
import { ProfileAdminUsers } from './admin/profile-admin-user';
import { ProfileAuc } from './admin/profile-auc';
import { ProfileOrders } from './admin/profile-orders';
import { ProfilePlots } from './admin/profile-plots';
import { ProfileZalob } from './admin/profile-zalob';
import { ViewData } from './admin/view-data';
import { OfferHistory } from './history';
import { OtherProfile } from './other-profile';
import { Profile } from './profile';
import { ProfileCustomer } from './profile-customer';
import { Service } from './service';
import { SubManager } from './sub-management';

export const Routing = ({ setVisible, visible }) => {
  const location = useLocation();

  const subscription = useSelector(state => state.userReducer.user.subscription);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(false);
    if (location.pathname.search('inner') === -1) setTimeout(() => setVisible(true), 900);
    else setTimeout(() => setVisible(true), 1700);
    // if (q_params_uid && q_params_token) {
    //   setIsAuthShow('showResetConfirm');
    //   dispatch(userActions.setUid64(q_params_uid));
    //   dispatch(userActions.setResetToken(q_params_token));
    // }
  }, [location]);

  return (
    <Routes>
      <Route path={paths.home} element={<Navigate to={paths.login} replace />} />
      {/* <Route exact path={paths.home} element={<HomePage />} /> */}
      <Route exact path={paths.all} element={<HomePage />} />

      <Route path={paths.login} element={<UnAuthRoute />}>
        <Route path={paths.login} element={<LoginPage />} />
      </Route>

      {/* Аук */}
      <Route path={paths.auctions} element={<PrivateRoute />}>
        <Route path={paths.auctions} element={<Auctions />} />
      </Route>
      <Route path={paths.auction} element={<PrivateRoute />}>
        <Route path={paths.auction} element={<Auction />} />
      </Route>

      {/* Доска заказов */}
      <Route path={paths.orders} element={<PrivateRoute />}>
        <Route path={paths.orders} element={<OrderCatalogPage />} />
      </Route>
      <Route path={paths.order} element={<PrivateRoute />}>
        <Route path={paths.order} element={<Order />} />
      </Route>

      {/* Profile */}
      <Route path={paths.profile} element={<PrivateRoute />}>
        <Route path={paths.profile} element={<Profile />} />
      </Route>
      <Route path={paths.otherprofile} element={<PrivateRoute />}>
        <Route path={paths.otherprofile} element={<OtherProfile />} />
      </Route>
      <Route path={paths.adminAuc} element={<PrivateRoute />}>
        <Route path={paths.adminAuc} element={<ProfileAuc />} />
      </Route>
      <Route path={paths.adminOrders} element={<PrivateRoute />}>
        <Route path={paths.adminOrders} element={<ProfileOrders />} />
      </Route>
      <Route path={paths.adminPlots} element={<PrivateRoute />}>
        <Route path={paths.adminPlots} element={<ProfilePlots />} />
      </Route>
      <Route path={paths.adminZalob} element={<PrivateRoute />}>
        <Route path={paths.adminZalob} element={<ProfileZalob />} />
      </Route>
      <Route path={paths.adminView} element={<PrivateRoute />}>
        <Route path={paths.adminView} element={<ViewData />} />
      </Route>
      <Route path={paths.adminUsers} element={<PrivateRoute />}>
        <Route path={paths.adminUsers} element={<ProfileAdminUsers />} />
      </Route>

      {/* Chat */}
      <Route path={paths.chat} element={<PrivateRoute />}>
        <Route exact path={paths.chat} element={<Chat />} />
      </Route>
      {/* Inner */}
      <Route exact path={paths.cataloginner} element={<CatalogInner />} />
      {/* Inner 2*/}
      <Route exact path={paths.cataloginner2} element={<PrivateRoute />}>
        <Route exact path={paths.cataloginner2} element={<CatalogInner2 />} />
      </Route>

      <Route exact path={paths.register} element={<RegisterPage />} />
      <Route exact path={paths.recoverPassword} element={<RecoverPassword />} />
      <Route exact path={paths.plotsCatalog} element={<PlotsCatalogPage />} />
      {/* <Route exact path={paths.orders} element={<PlotsCatalogPage1 />} /> */}
      <Route exact path={paths.tariffs} element={<Tariffs />} />
      <Route exact path={paths.notebook} element={<Notebook />} />
      <Route exact path={paths.check} element={<Check />} />
      <Route exact path={paths.modals} element={<Modals />} />

      <Route exact path={paths.plotsCatalog2} element={<PlotsCatalogPage2 />} />
      <Route exact path={paths.performer} element={<WinPerformer />} />
      {/* <Route exact path={paths.authorprofile} element={<AuthorProfile />} /> */}
      <Route exact path={paths.history} element={<OfferHistory />} />
      <Route exact path={paths.favourite} element={<Service />} />
      <Route exact path={paths.customer} element={<ProfileCustomer />} />

      <Route exact path={paths.sub} element={<SubManager />} />
      <Route exact path={paths.service} element={<Service />} />
      <Route exact path={paths.upgrade} element={<Service />} />
      <Route exact path={paths.notions} element={<Service />} />

      <Route exact path={paths.profileadmin} element={<ProfileAdmin />} />
    </Routes>
  );
};
