<div class="card overflow-hidden border-0"
    style="border: 1px solid; border-radius: 16px;">
    <div>
        <div class="item-card9-img" style="width: 100%">
            <div class="item-card9-imgs" style="border-radius: 10px;">
                <a href="/Cours/{{ $course->link }}"></a>
                <img loading="lazy" src="/storage/cours/{{ $course->picture }}" alt="YOOL | {{ strtolower(Cookie::get('locale')) === 'en' ? $course->cours_en : $course->cours_fr }}" class="cover-image">
            </div>
        </div>
    </div>
    <div class="card-body pb-0">
        <div class="item-card9 " style="height: 200px;">
            <span class="item-card-badge"><i class="fa fa-briefcase me-1"></i>
                @if (Cookie::get('locale') == 'EN' || Cookie::get('locale') == 'en')
                    {{ $course->matiere_en }}
                @else
                    {{ $course->matiere_fr }}
                @endif
            </span>
            <a href="/Cours/{{ $course->link }}" class="text-default-dark mt-2">
                <h5 class="mt-2 mb-2">
                    @if (Cookie::get('locale') == 'EN' || Cookie::get('locale') == 'en')
                        {{ $course->cours_en }}
                    @else
                        {{ $course->cours_fr }}
                    @endif
                </h5>
            </a>
            @php
                if (Cookie::get('locale') == 'EN' || Cookie::get('locale') == 'en') {
                    if (strlen($course->resume_en) > 140) {
                        $str = substr($course->resume_en, 0, 140);
                        $arrstr = explode(' ', $str);
                        unset($arrstr[count($arrstr) - 1]);
                        $resume = implode(' ', $arrstr);
                    } else {
                        $resume = $course->resume_en;
                    }
                } else {
                    if (strlen($course->resume_fr) > 140) {
                        $str = substr($course->resume_fr, 0, 140);
                        $arrstr = explode(' ', $str);
                        unset($arrstr[count($arrstr) - 1]);
                        $resume = implode(' ', $arrstr);
                    } else {
                        $resume = $course->resume_fr;
                    }
                }
            @endphp
            <p class="mb-0">{{ $resume }} </p>
        </div>

    </div>
    <div>
        <div class="rating-stars d-flex pb-4" style="justify-content: center">
            <a href="/Cours/{{ $course->link }}" class="btn btn-secondary rounded"
                style="margin-top: 2% ; border-radius: 25px !important;">{{ __('More_Details') }}</a>
        </div>
    </div>
</div>
