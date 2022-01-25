'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">szakszolg-nx documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' : 'data-target="#xs-controllers-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' :
                                            'id="xs-controllers-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' : 'data-target="#xs-injectables-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' :
                                        'id="xs-injectables-links-module-AppModule-be71653b41ed07e41cc1cdedc4db20e7120e6d383bc401775d54f08916fe081876e79321ccab1a3e7212442d92d39bf5a1874290b80badcc83c99466a85836df"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' : 'data-target="#xs-controllers-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' :
                                            'id="xs-controllers-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' : 'data-target="#xs-injectables-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' :
                                        'id="xs-injectables-links-module-AuthModule-15faa29ae2561c8d5312d4d489fa8863192f8bc1777aa43db8850f83446d131cbd7de3a0266799d4977f309745b81ced83db291f7df0598cb37613ba8ae611c5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-35dc5ce20888f1331a39a3ecd46359cf4652a3d42e33339ff06c70c945f0e370162522f8d87f1d959289867e948c7194ba63a01efb1b81cbe7d8822ba5dbd857"' : 'data-target="#xs-injectables-links-module-RoleModule-35dc5ce20888f1331a39a3ecd46359cf4652a3d42e33339ff06c70c945f0e370162522f8d87f1d959289867e948c7194ba63a01efb1b81cbe7d8822ba5dbd857"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-35dc5ce20888f1331a39a3ecd46359cf4652a3d42e33339ff06c70c945f0e370162522f8d87f1d959289867e948c7194ba63a01efb1b81cbe7d8822ba5dbd857"' :
                                        'id="xs-injectables-links-module-RoleModule-35dc5ce20888f1331a39a3ecd46359cf4652a3d42e33339ff06c70c945f0e370162522f8d87f1d959289867e948c7194ba63a01efb1b81cbe7d8822ba5dbd857"' }>
                                        <li class="link">
                                            <a href="injectables/RoleRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-898a55ff58422caaed33a75619c6882f6e099f03bad74996c0dcadac578c7456e39261fcfd0a5aff499a73bcafbd066ae3a92e5db8addb5d00b07f7144d4abfc"' : 'data-target="#xs-injectables-links-module-UsersModule-898a55ff58422caaed33a75619c6882f6e099f03bad74996c0dcadac578c7456e39261fcfd0a5aff499a73bcafbd066ae3a92e5db8addb5d00b07f7144d4abfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-898a55ff58422caaed33a75619c6882f6e099f03bad74996c0dcadac578c7456e39261fcfd0a5aff499a73bcafbd066ae3a92e5db8addb5d00b07f7144d4abfc"' :
                                        'id="xs-injectables-links-module-UsersModule-898a55ff58422caaed33a75619c6882f6e099f03bad74996c0dcadac578c7456e39261fcfd0a5aff499a73bcafbd066ae3a92e5db8addb5d00b07f7144d4abfc"' }>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CoreResolver.html" data-type="entity-link" >CoreResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleInput.html" data-type="entity-link" >CreateRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserInput.html" data-type="entity-link" >CreateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRoleInput.html" data-type="entity-link" >DeleteRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserInput.html" data-type="entity-link" >DeleteUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetRoleArgs.html" data-type="entity-link" >GetRoleArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetRolesArgs.html" data-type="entity-link" >GetRolesArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserArgs.html" data-type="entity-link" >GetUserArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersArgs.html" data-type="entity-link" >GetUsersArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GqlArg.html" data-type="entity-link" >GqlArg</a>
                            </li>
                            <li class="link">
                                <a href="classes/GqlAuthGuard.html" data-type="entity-link" >GqlAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/GqlInput.html" data-type="entity-link" >GqlInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdArg.html" data-type="entity-link" >IdArg</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdArrayArg.html" data-type="entity-link" >IdArrayArg</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdInput.html" data-type="entity-link" >IdInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleResolver.html" data-type="entity-link" >RoleResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleInput.html" data-type="entity-link" >UpdateRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserInput.html" data-type="entity-link" >UpdateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersResolver.html" data-type="entity-link" >UsersResolver</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RepositoryProxyService.html" data-type="entity-link" >RepositoryProxyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleRepository.html" data-type="entity-link" >RoleRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SimpleRepository.html" data-type="entity-link" >SimpleRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepository.html" data-type="entity-link" >UserRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PermissionGuard.html" data-type="entity-link" >PermissionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});