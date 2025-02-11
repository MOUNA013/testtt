<a href="{{ route('library.show', ['slug' => $resource->link]) }}"
    class="p-2"
    data-category>
    <div class="card card-master m-0 relative h-100">
        <div>
            @foreach ($resource->languages as $language)
            @if ($language->pivot->is_default)
            @php
            $alt = $language->pivot->title;
            @endphp
            @break
            @else
            @continue
            @endif
            @endforeach
            <img src="{{ asset('storage/' . $resource->thumbnail) }}" class="card-img-top p-3 h-100" alt="{{ $alt }}" />
            {{-- <div class="item-tag">
                    <h4 class="mb-0 h6">{{ $resource->category->name }}</h4>
                </div> --}}
        </div>

        <div class="card-body-master card-body d-flex flex-column justify-content-between pb-4">
            <div class="flex-grow-1">
                <div class="row mb-2">
                    <h5 class="card-title m-0 
                        @foreach ($resource->languages as $language)
                            @if ($language->pivot->is_default)
                                {{ $resource->languages  }}
                                @break
                            @else
                                @continue
                            @endif
                        @endforeach"
                    >
                        @foreach ($resource->languages as $language)
                            @if ($language->pivot->is_default)
                                {{ $language->pivot->title }}
                                @break
                            @else
                                @continue
                            @endif
                        @endforeach
                    </h5>
                </div>
                <p class="card-text">
                    @foreach ($resource->languages as $language)
                    @if ($language->pivot->is_default)
                    {{-- {{ strlen($language->pivot->description) > 120 ?
                        substr($language->pivot->description, 0, 120) . '...' :
                        $language->pivot->description}} --}}
                    {{ $language->pivot->description}}
                    @break
                    @else
                    @continue
                    @endif
                    @endforeach
                </p>
            </div>
            <div class="pb-2">
                <button class="btn btn-primary w-100">Savoir plus de
                    Détails
                </button>
            </div>

            <div class="d-flex align-items-baseline justify-content-between mt-2">
                <div class="d-flex align-items-center gap-2">
                    <i class="fa fa-eye"></i>
                    <p class="custom-text mb-0">{{ $resource->total_views }} Vues!</p>
                </div>
                <p class="custom-text mb-0">50 étudiants engagés</p>
            </div>
        </div>
    </div>
</a>
