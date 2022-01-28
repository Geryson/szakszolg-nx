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
                                            'data-target="#controllers-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' : 'data-target="#xs-controllers-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' :
                                            'id="xs-controllers-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' : 'data-target="#xs-injectables-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' :
                                        'id="xs-injectables-links-module-AppModule-63c2aff124c15e598173fa6fdf2f266bbc8a6817f8c8a2fcf99459320120cb46aa1f7558c3c74873a523fcf24df167ac1225ab6a03d43b9bc5d693efdf1baf78"' }>
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
                                <a href="modules/GroupingItemModule.html" data-type="entity-link" >GroupingItemModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GroupingItemModule-eaf06f794c5ec66f0c373109aac55b9dce5aa1272e9b8ac37bfda32247d3996ff29f006de379445a91b47dfe82165467b475bdf2dd192e6bc2595d3a6ab84a44"' : 'data-target="#xs-injectables-links-module-GroupingItemModule-eaf06f794c5ec66f0c373109aac55b9dce5aa1272e9b8ac37bfda32247d3996ff29f006de379445a91b47dfe82165467b475bdf2dd192e6bc2595d3a6ab84a44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GroupingItemModule-eaf06f794c5ec66f0c373109aac55b9dce5aa1272e9b8ac37bfda32247d3996ff29f006de379445a91b47dfe82165467b475bdf2dd192e6bc2595d3a6ab84a44"' :
                                        'id="xs-injectables-links-module-GroupingItemModule-eaf06f794c5ec66f0c373109aac55b9dce5aa1272e9b8ac37bfda32247d3996ff29f006de379445a91b47dfe82165467b475bdf2dd192e6bc2595d3a6ab84a44"' }>
                                        <li class="link">
                                            <a href="injectables/GroupingItemRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupingItemRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupingItemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupingItemService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HangmanWordModule.html" data-type="entity-link" >HangmanWordModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HangmanWordModule-7aa6a037872f13d27624934a7476f29870b584cd17ff64ff6f70ae89389a8f160a5b18c488f8558124e051da7a10d11aa218919c8da4a70f09ba57a24da6abfd"' : 'data-target="#xs-injectables-links-module-HangmanWordModule-7aa6a037872f13d27624934a7476f29870b584cd17ff64ff6f70ae89389a8f160a5b18c488f8558124e051da7a10d11aa218919c8da4a70f09ba57a24da6abfd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HangmanWordModule-7aa6a037872f13d27624934a7476f29870b584cd17ff64ff6f70ae89389a8f160a5b18c488f8558124e051da7a10d11aa218919c8da4a70f09ba57a24da6abfd"' :
                                        'id="xs-injectables-links-module-HangmanWordModule-7aa6a037872f13d27624934a7476f29870b584cd17ff64ff6f70ae89389a8f160a5b18c488f8558124e051da7a10d11aa218919c8da4a70f09ba57a24da6abfd"' }>
                                        <li class="link">
                                            <a href="injectables/HangmanWordRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HangmanWordRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HangmanWordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HangmanWordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MirrorWordModule.html" data-type="entity-link" >MirrorWordModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MirrorWordModule-f605263c5e53aae290a5d5b917301d4db2c72446297b6f7abe3c317439bfbfd41727a8688f2a6b2ad6ef4ef1ce2f7b5f7709f2b311fefe0bf1a2ccd07fa62999"' : 'data-target="#xs-injectables-links-module-MirrorWordModule-f605263c5e53aae290a5d5b917301d4db2c72446297b6f7abe3c317439bfbfd41727a8688f2a6b2ad6ef4ef1ce2f7b5f7709f2b311fefe0bf1a2ccd07fa62999"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MirrorWordModule-f605263c5e53aae290a5d5b917301d4db2c72446297b6f7abe3c317439bfbfd41727a8688f2a6b2ad6ef4ef1ce2f7b5f7709f2b311fefe0bf1a2ccd07fa62999"' :
                                        'id="xs-injectables-links-module-MirrorWordModule-f605263c5e53aae290a5d5b917301d4db2c72446297b6f7abe3c317439bfbfd41727a8688f2a6b2ad6ef4ef1ce2f7b5f7709f2b311fefe0bf1a2ccd07fa62999"' }>
                                        <li class="link">
                                            <a href="injectables/MirrorWordRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MirrorWordRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MirrorWordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MirrorWordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuizModule.html" data-type="entity-link" >QuizModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-QuizModule-5ad23761057a6e0691cbfdd94a962ccdabdda80cd2c7447f3ed99cb98b63f67d7db2c7e3ce5b9d24481f773ef8f9b3af514475724a9537516227ec7c37874814"' : 'data-target="#xs-injectables-links-module-QuizModule-5ad23761057a6e0691cbfdd94a962ccdabdda80cd2c7447f3ed99cb98b63f67d7db2c7e3ce5b9d24481f773ef8f9b3af514475724a9537516227ec7c37874814"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuizModule-5ad23761057a6e0691cbfdd94a962ccdabdda80cd2c7447f3ed99cb98b63f67d7db2c7e3ce5b9d24481f773ef8f9b3af514475724a9537516227ec7c37874814"' :
                                        'id="xs-injectables-links-module-QuizModule-5ad23761057a6e0691cbfdd94a962ccdabdda80cd2c7447f3ed99cb98b63f67d7db2c7e3ce5b9d24481f773ef8f9b3af514475724a9537516227ec7c37874814"' }>
                                        <li class="link">
                                            <a href="injectables/QuizRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QuizService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuizQuestionModule.html" data-type="entity-link" >QuizQuestionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-QuizQuestionModule-21555e641a5b3fe1857f909ab6635a5c33208117e50106b22a61f56f528e731e85711dd7713e09c40fca71060d81405d75c943014bb3fe81667e463bcfc4def5"' : 'data-target="#xs-injectables-links-module-QuizQuestionModule-21555e641a5b3fe1857f909ab6635a5c33208117e50106b22a61f56f528e731e85711dd7713e09c40fca71060d81405d75c943014bb3fe81667e463bcfc4def5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuizQuestionModule-21555e641a5b3fe1857f909ab6635a5c33208117e50106b22a61f56f528e731e85711dd7713e09c40fca71060d81405d75c943014bb3fe81667e463bcfc4def5"' :
                                        'id="xs-injectables-links-module-QuizQuestionModule-21555e641a5b3fe1857f909ab6635a5c33208117e50106b22a61f56f528e731e85711dd7713e09c40fca71060d81405d75c943014bb3fe81667e463bcfc4def5"' }>
                                        <li class="link">
                                            <a href="injectables/QuizQuestionRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizQuestionRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QuizQuestionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizQuestionService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolModule-b587b9b7a4e6ec89062317cfefde407cd6b878f137ce3d46bced384fcbe01710f527df27e80b5db580b1c6148f2763478b90be104f3059e30ac30280cb1b7d72"' : 'data-target="#xs-injectables-links-module-SchoolModule-b587b9b7a4e6ec89062317cfefde407cd6b878f137ce3d46bced384fcbe01710f527df27e80b5db580b1c6148f2763478b90be104f3059e30ac30280cb1b7d72"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolModule-b587b9b7a4e6ec89062317cfefde407cd6b878f137ce3d46bced384fcbe01710f527df27e80b5db580b1c6148f2763478b90be104f3059e30ac30280cb1b7d72"' :
                                        'id="xs-injectables-links-module-SchoolModule-b587b9b7a4e6ec89062317cfefde407cd6b878f137ce3d46bced384fcbe01710f527df27e80b5db580b1c6148f2763478b90be104f3059e30ac30280cb1b7d72"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
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
                                <a href="classes/CreateGroupingItemInput.html" data-type="entity-link" >CreateGroupingItemInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHangmanWordInput.html" data-type="entity-link" >CreateHangmanWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMirrorWordInput.html" data-type="entity-link" >CreateMirrorWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuizInput.html" data-type="entity-link" >CreateQuizInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuizQuestionInput.html" data-type="entity-link" >CreateQuizQuestionInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleInput.html" data-type="entity-link" >CreateRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSchoolInput.html" data-type="entity-link" >CreateSchoolInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserInput.html" data-type="entity-link" >CreateUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteGroupingItemInput.html" data-type="entity-link" >DeleteGroupingItemInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteHangmanWordInput.html" data-type="entity-link" >DeleteHangmanWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteMirrorWordInput.html" data-type="entity-link" >DeleteMirrorWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteQuizInput.html" data-type="entity-link" >DeleteQuizInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteQuizQuestionInput.html" data-type="entity-link" >DeleteQuizQuestionInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRoleInput.html" data-type="entity-link" >DeleteRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteSchoolInput.html" data-type="entity-link" >DeleteSchoolInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserInput.html" data-type="entity-link" >DeleteUserInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGroupingItemArgs.html" data-type="entity-link" >GetGroupingItemArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGroupingItemsArgs.html" data-type="entity-link" >GetGroupingItemsArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetHangmanWordArgs.html" data-type="entity-link" >GetHangmanWordArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetHangmanWordsArgs.html" data-type="entity-link" >GetHangmanWordsArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMirrorWordArgs.html" data-type="entity-link" >GetMirrorWordArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMirrorWordsArgs.html" data-type="entity-link" >GetMirrorWordsArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuizArgs.html" data-type="entity-link" >GetQuizArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuizQuestionArgs.html" data-type="entity-link" >GetQuizQuestionArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuizQuestionsArgs.html" data-type="entity-link" >GetQuizQuestionsArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetQuizzesArgs.html" data-type="entity-link" >GetQuizzesArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetRoleArgs.html" data-type="entity-link" >GetRoleArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetRolesArgs.html" data-type="entity-link" >GetRolesArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSchoolArgs.html" data-type="entity-link" >GetSchoolArgs</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSchoolsArgs.html" data-type="entity-link" >GetSchoolsArgs</a>
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
                                <a href="classes/GroupingItem.html" data-type="entity-link" >GroupingItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupingItemResolver.html" data-type="entity-link" >GroupingItemResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/HangmanWord.html" data-type="entity-link" >HangmanWord</a>
                            </li>
                            <li class="link">
                                <a href="classes/HangmanWordResolver.html" data-type="entity-link" >HangmanWordResolver</a>
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
                                <a href="classes/MirrorWord.html" data-type="entity-link" >MirrorWord</a>
                            </li>
                            <li class="link">
                                <a href="classes/MirrorWordResolver.html" data-type="entity-link" >MirrorWordResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Quiz.html" data-type="entity-link" >Quiz</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizQuestion.html" data-type="entity-link" >QuizQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizQuestionResolver.html" data-type="entity-link" >QuizQuestionResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizResolver.html" data-type="entity-link" >QuizResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleResolver.html" data-type="entity-link" >RoleResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/SchoolResolver.html" data-type="entity-link" >SchoolResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGroupingItemInput.html" data-type="entity-link" >UpdateGroupingItemInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHangmanWordInput.html" data-type="entity-link" >UpdateHangmanWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMirrorWordInput.html" data-type="entity-link" >UpdateMirrorWordInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuizInput.html" data-type="entity-link" >UpdateQuizInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuizQuestionInput.html" data-type="entity-link" >UpdateQuizQuestionInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleInput.html" data-type="entity-link" >UpdateRoleInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSchoolInput.html" data-type="entity-link" >UpdateSchoolInput</a>
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
                                    <a href="injectables/GroupingItemRepository.html" data-type="entity-link" >GroupingItemRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupingItemService.html" data-type="entity-link" >GroupingItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HangmanWordRepository.html" data-type="entity-link" >HangmanWordRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HangmanWordService.html" data-type="entity-link" >HangmanWordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MirrorWordRepository.html" data-type="entity-link" >MirrorWordRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MirrorWordService.html" data-type="entity-link" >MirrorWordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizQuestionRepository.html" data-type="entity-link" >QuizQuestionRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizQuestionService.html" data-type="entity-link" >QuizQuestionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizRepository.html" data-type="entity-link" >QuizRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizService.html" data-type="entity-link" >QuizService</a>
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
                                    <a href="injectables/SchoolRepository.html" data-type="entity-link" >SchoolRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SchoolService.html" data-type="entity-link" >SchoolService</a>
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