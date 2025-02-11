<div class="card overflow-hidden border-0"
    style="border: 1px solid @if ($parcour->id_category == 2) #f07f19 @else #3571D5 @endif; border-radius: 16px;">
    <div>
        <div class="item-card9-img" style="width: 100%">
            <div class="item-card9-imgs img-gradient-card-secondary">
                <a href="/parcours/{{ $parcour->link }}"></a>
                <img src="/storage/parcours/{{ $parcour->picture }}"
                    alt="YOOL | {{ strtolower(Cookie::get('locale')) === 'en' ? $parcour->titre_en : $parcour->titre_fr }}"
                    class="cover-image">
            </div>
            <div class="item-overly-trans">
                <a href="/parcours/{{ $parcour->link }}" class="mt-2" style="background: transparent;">
                    <h5 class="mt-2 mb-0 text-white font-weight-bold">
                        @if (Cookie::get('locale') == 'EN' || Cookie::get('locale') == 'en')
                            {{ $parcour->titre_en }}
                        @else
                            {{ $parcour->titre_fr }}
                        @endif
                    </h5>
                </a>
            </div>
        </div>
    </div>

    <div class="card-body pb-0 pt-2 ps-4 card-body-bg">
        <div class="item-card9" style="min-height: 130px; overflow: hidden;">

            @php
                if (Cookie::get('locale') == 'EN' || Cookie::get('locale') == 'en') {
                    if (strlen($parcour->resume_en) > 140) {
                        $str = substr($parcour->resume_en, 0, 140);
                        $arrstr = explode(' ', $str);
                        unset($arrstr[count($arrstr) - 1]);
                        $resume = implode(' ', $arrstr);
                    } else {
                        $resume = $parcour->resume_en;
                    }
                } else {
                    if (strlen($parcour->resume_fr) > 140) {
                        $str = substr($parcour->resume_fr, 0, 140);
                        $arrstr = explode(' ', $str);
                        unset($arrstr[count($arrstr) - 1]);
                        $resume = implode(' ', $arrstr);
                    } else {
                        $resume = $parcour->resume_fr;
                    }
                }

            @endphp
            <p class="mb-0">{{ $resume }}</p>

        </div>
        <div class="mt-2">
            <div class="rating-stars d-flex pb-2" style="justify-content: center">
                <a href="/parcours/{{ $parcour->link }}"
                    class="btn btn-sm py-2 px-4 btn-outline-secondary rounded"
                    style="margin-top: 2% ; border-radius: 25px !important;">{{ __('More_Details') }}</a>
            </div>
        </div>
    </div>
</div>
