@extends('layouts.app')

@section('content')
    <section class="assetCode">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form action="{{ route('dao.search') }}">
                        @csrf
                        <div class="assetInput">
                            <label for="assetCode" class="form-label">Assest Code</label>
                            <input type="text" class="form-control" id="assetCode"
                                aria-describedby="emailHelp" name="asset_code" value="{{Session::get('code')}}">
                        </div>
                        <div class="assetInput">
                            <label for="homeDomain" class="form-label">Home Domain</label>
                            <input type="text" class="form-control" id="homeDomain" name="home_domain" value="{{Session::get('domain')}}">
                        </div>
                        <button type="submit" class="btn assetSearch">Search</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    @if (Session::has('toml'))
    <section class="project_Description ">
        <div class="container">
            <input type="text" id="dao-description" value="{{ Session::get('toml')['DOCUMENTATION']['ORG_DESCRIPTION'] }}" hidden />
            <div class="row project_Description_content">
                <div class="col-lg-8 col-md-8 col-sm-12">
                    <div class="pro_dec">
                        <div class="frDiv">
                            <label class="label">Project</label>
                            <label class="label">Ticker</label>
                            <label class="label">Home Domain</label>
                            <label class="label">Holders</label>
                            <label class="label">Tokens Required to Create Proposal</label>
                        </div>
                        <div class="ScDiv">
                            <p id="dao-project">{{ Session::get('toml')['DOCUMENTATION']['ORG_NAME'] }}</p>
                            <p id="dao-asset">{{ Session::get('code') }}</p>
                            <p id="dao-domain">{{ Session::get('domain') }}</p>
                            <p id="dao-holders">999</p>
                            <input type="number" placeholder="Enter Amount" class="form-control" id="required-tokens">
                        </div>
                    </div>

                    <div class="wallet_Dec d-flex">
                        <label class="label" for="">Approved Wallets </label>
                        <p>*Check the wallets that you want to make vissible. *</p>
                    </div>
                    <div class="checkboxWallet">
                        @foreach (Session::get('toml')['ACCOUNTS'] as $key => $account)
                        <div class="approved-wallets form-group row">
                            @php $connected_account = $_COOKIE['public']; @endphp
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <input type="checkbox" id="wallet{{$key}}" value="{{$account}}" {{$account==$connected_account ? 'checked disabled' : ''}}>
                                <label for="wallet{{$key}}" class="col-form-label text-break">
                                    {{$account}}
                                    @if($account==$connected_account) (<span class="text-success">connected</span>) @endif
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                                <input type="text" class="wallet-name form-control mb-1 {{$account!=$connected_account ? 'd-none' : 'active'}}" placeholder="Wallet name">
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 order1">
                    <div class="gray-div-logo">
                        {{-- <p>Project Logo</p> --}}
                        <img src="{{ Session::get('toml')['DOCUMENTATION']['ORG_LOGO'] }}" id="dao-logo" alt="Image">
                    </div>
                </div>
            </div>
            <div class="row project_Description_content">
                <div class="col-12 text-center">
                    <button class="btn btnCreateD" id="create-dao">
                        <p>Create DAO</p>
                        <p class="lumostext">(10,000 LUMOS)</p>
                    </button>
                </div>
            </div>
        </div>
    </section>
    @endif

    <section class="errorDao d-none">
        <div class="container">
            <div class="innerError">
                <div class="row">
                    <div class="col-12">
                        <div class="emoiDiv">
                            <img src="{{ asset('images/emoji.png') }}" alt="">
                            <p>Your Wallet is not aproved in the TOML</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="guideWallet">
                            <p><span><img src="{{ asset('images/dot.png') }}" alt=""></span>Add you wallter
                                address here: example.com/.well-known/stellar.toml, OR</p>
                            <p><span><img src="{{ asset('images/dot.png') }}" alt=""></span>Try again with
                                any other approved account.</p>
                        </div>
                        <div class="guideLink">
                            <h6>Tutorial</h6>
                            <p><a href="">Click here </a>to learn how to approve you Stellar walltet address
                                through toml.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
