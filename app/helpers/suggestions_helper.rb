module SuggestionsHelper
    def class_for_suggestion_li(suggestion)
        "'greenlit'" if suggestion.greenlit?
    end

    def greenlit_or_pending(suggestion)
        if suggestion.greenlit?
            'Greenlit'
        else
            'Pending'       
        end
    end
end
