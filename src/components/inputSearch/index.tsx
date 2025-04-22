import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlass } from 'phosphor-react';

interface SearchInputProps {
	search: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSearch?: () => void;
	placeholder?: string;
}

export const InputSearch: React.FC<SearchInputProps> = ({
	search,
	onChange,
	onSearch,
	placeholder,
}) => {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSearch?.();
		}
	};

	return (
		<div className="flex max-w-md w-full items-center space-x-2 ml-10">
			<Input
				className="h-12 text-zinc-900 text-lg font-roboto font-medium placeholder:text-zinc-400 focus:border-primary focus-visible:ring-0 focus:outline-none"
				type="search"
				placeholder={placeholder}
				value={search}
				onChange={onChange}
				onKeyDown={handleKeyDown}
			/>
			<Button
				className="h-12 bg-primary text-white"
				type="button"
				onClick={onSearch}
			>
				<MagnifyingGlass size={35} weight="bold" className="text-white" />
			</Button>
		</div>
	);
};
